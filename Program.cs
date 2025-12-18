using IELCAPICore;
using IELCAPICore.Controllers;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Azure Blob Config
builder.Services.Configure<AzureBlobStorageOptions>(
    builder.Configuration.GetSection("AzureBlobStorage"));

// CORS - Add BOTH development and production URLs
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
            "http://localhost:4200",                          // Local development
            "https://ielc-test.azurewebsites.net",           // Test environment
            "https://your-production-url.azurewebsites.net"  // Production (update as needed)
        )
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();  // REQUIRED for SignalR with credentials
    });
});

// DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Services
builder.Services.AddScoped<EnrollmentData>();
builder.Services.AddSingleton<Service>();

// Controllers
builder.Services.AddControllers();

// Swagger + API Key
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "IELCAPICore", Version = "v1" });

    c.AddSecurityDefinition("ApiKey", new OpenApiSecurityScheme
    {
        Description = "Enter your API key in the Authorization header",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "ApiKey"
                }
            },
            Array.Empty<string>()
        }
    });
});

// HttpClient
builder.Services.AddHttpClient<IELCQAController>();

// ✅ Add SignalR BEFORE Build()
builder.Services.AddSignalR();

var app = builder.Build();

// ✅ IMPORTANT: CORS MUST come FIRST in the pipeline (right after Build())
app.UseCors("AllowFrontend");

// ✅ Map SignalR Hub AFTER UseCors but BEFORE API Key middleware
app.MapHub<ActiveUsersHub>("/activeUsersHub");

// ✅ API Key Middleware - SKIP SignalR Hub and other excluded paths
var apiKey = builder.Configuration.GetValue<string>("AppSettings:ApiKey");

app.Use(async (context, next) =>
{
    var path = context.Request.Path;

    // Exclude paths that don't need API key
    if (path.StartsWithSegments("/swagger") ||
        path.StartsWithSegments("/swagger-ui") ||
        path.StartsWithSegments("/swagger-resources") ||
        path.StartsWithSegments("/favicon.ico") ||
        path.StartsWithSegments("/activeUsersHub") ||  // ✅ SignalR Hub exemption
        path.StartsWithSegments("/swagger/v1/swagger.json"))  // ✅ Swagger JSON
    {
        await next.Invoke();
        return;
    }

    // Check for API Key
    if (!context.Request.Headers.TryGetValue("Authorization", out var extractedApiKey))
    {
        context.Response.StatusCode = 401;
        await context.Response.WriteAsync("API Key is missing");
        return;
    }

    // Validate API Key
    if (!apiKey.Equals(extractedApiKey))
    {
        context.Response.StatusCode = 403;
        await context.Response.WriteAsync("Invalid API Key");
        return;
    }

    await next.Invoke();
});

// Optional Logging Service
var someService = app.Services.GetRequiredService<Service>();
someService.SomeMethod();

// Pipeline
app.UseStaticFiles();
app.UseDefaultFiles();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "IELCAPICore v1");
    c.DocExpansion(Swashbuckle.AspNetCore.SwaggerUI.DocExpansion.None);
});

// Security Headers
app.Use(async (context, next) =>
{
    context.Response.Headers.Add("Cross-Origin-Opener-Policy", "same-origin");
    context.Response.Headers.Add("Cross-Origin-Embedder-Policy", "require-corp");
    await next();
});

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.Run();
