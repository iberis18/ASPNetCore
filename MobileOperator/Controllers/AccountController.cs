using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLL.Models;
using DAL.Entity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;


namespace MobileOperator.Controllers
{

    //контроллер аккаунов
    [Produces("application/json")]
    public class AccountController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        ILogger logger; // логгер

        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            var loggerFactory = LoggerFactory.Create(builder =>
            {
                builder.AddConsole();
            });

            logger = loggerFactory.CreateLogger<AccountController>();
        }

        //регистрация 
        [HttpPost]
        [Route("api/Account/Register")]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                User user = new User
                {
                    PhoneNumber = model.Number,
                    UserName = model.Number
                };

                // Добавление нового пользователя
                var result = await _userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(user, "user");
                    // установка куки
                    await _signInManager.SignInAsync(user, false);
                    var msg = new { message = "Добавлен новый пользователь: " + user.UserName };
                    logger.LogInformation("New user registered: " + user.UserName);
                    return Ok(msg);
                }
                else
                {
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError(string.Empty, error.Description);
                    }
                    var errorMsg = new
                    {
                        message = "Пользователь не добавлен.",
                        error = ModelState.Values.SelectMany(e => e.Errors.Select(er => er.ErrorMessage))
                    };
                    return Ok(errorMsg);
                }
            }
            else
            {
                var errorMsg = new
                {
                    message = "Неверные входные данные.",
                    error = ModelState.Values.SelectMany(e =>
                   e.Errors.Select(er => er.ErrorMessage))
                };
                return Ok(errorMsg);
            }
        }


        //вход 
        [HttpPost]
        [Route("api/Account/Login")]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _signInManager.PasswordSignInAsync(model.Number, model.Password, model.RememberMe, false);
                if (result.Succeeded)
                {
                    
                    var user = await _userManager.FindByNameAsync(model.Number);
                    string role = "";
                    if (await _userManager.IsInRoleAsync(user, "admin"))
                    {
                        role = "admin";
                        logger.LogInformation(model.Number + " administrator login");
                    }
                    else
                    {
                        role = "user";
                        logger.LogInformation(model.Number + " user login");
                    }
                    var msg = new
                    {
                        message = "Выполнен вход пользователем: " + model.Number,
                        role = role
                    };
                    return Ok(msg);
                }
                else
                {
                    ModelState.AddModelError("", "Неправильный логин и (или) пароль");
                   
                    var errorMsg = new
                    {
                        message = "Вход не выполнен.",
                        error = ModelState.Values.SelectMany(e => e.Errors.Select(er => er.ErrorMessage))
                    };
                    return Ok(errorMsg);
                }
            }
            else
            {
                var errorMsg = new
                {
                    message = "Вход не выполнен.",
                    error = ModelState.Values.SelectMany(e =>
                   e.Errors.Select(er => er.ErrorMessage))
                };
                return Ok(errorMsg);
            }
        }


        //выход 
        [HttpPost]
        [Route("api/Account/LogOff")]
        public async Task<IActionResult> LogOff()
        {
            User usr = await GetCurrentUserAsync();
            if (usr != null) 
                logger.LogInformation(usr.UserName + " user logout");

            // Удаление куки
            await _signInManager.SignOutAsync();
            var msg = new
            {
                message = "Выполнен выход."
            };
            return Ok(msg);
        }


        //проверка пользователя 
        [HttpPost]
        [Route("api/Account/isAuthenticated")]
        public async Task<IActionResult> LogisAuthenticatedOff()
        {
            User usr = await GetCurrentUserAsync();

            string role = "";
            string name = "";
            string message = "Вы Гость. Пожалуйста, выполните вход.";
            if (usr != null)
            {
                message = "Вы вошли как: " + usr.UserName;
                if (await _userManager.IsInRoleAsync(usr, "admin"))
                    role = "admin";
                else
                    role = "user";
                name = usr.UserName;
            }

            var msg = new
            {
                message = message,
                role = role,
                name = name
            };

            return Ok(msg);

        }
        private Task<User> GetCurrentUserAsync() => _userManager.GetUserAsync(HttpContext.User);
    }
}
