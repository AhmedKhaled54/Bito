using Microsoft.AspNetCore.Mvc;
using WeddingInvitation.Models;

namespace WeddingInvitation.Controllers;

public class HomeController : Controller
{
    private static readonly WeddingInfo Invitation = new();
    public IActionResult Index() => View(Invitation);
}
