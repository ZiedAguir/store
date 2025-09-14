import Header from "../../componnent/Header/headerprofil";
import SideBar from "../../componnent/SideBare/sideBare";
import FormHomeCategory from "./FormCategory/formHomeCategory";

function FormCategory() {
  return (
    <section className="body">
      <Header />
      <div className="inner-wrapper">
        <aside id="sidebar-left" className="sidebar-left">
          <div className="sidebar-header">
            <SideBar />
          </div>
        </aside>
       
       <FormHomeCategory/>
       
      </div>
    </section>
  );
}

export default FormCategory;
