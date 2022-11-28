import BasePage from "../base.page";
import Navbar from "../../elements/navbar";
import Logo from "../../elements/logo";
import Dropdown from "../../elements/dropdown";

export default class AppPage extends BasePage {
    navbar = Navbar
    logo = Logo
    dropdown = Dropdown
}