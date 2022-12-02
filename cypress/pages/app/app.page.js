import BasePage from "../base.page";
import Navbar from "../../elements/navbar";
import Logo from "../../elements/logo";
import Dropdown from "../../elements/dropdown";
import ModalWindow from "../../elements/modal-window";
import SearchForm from "../../elements/search-form";
import Dashboard from "../../elements/dashboard";

export default class AppPage extends BasePage {
    navbar = Navbar
    logo = Logo
    dropdown = Dropdown
    modalWindow = ModalWindow
    searchForm = SearchForm
    dashboard = Dashboard
}