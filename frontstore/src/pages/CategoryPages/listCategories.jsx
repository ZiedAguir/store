import Header from "../../componnent/Header/headerprofil";
import SideBar from "../../componnent/SideBare/sideBare";
import ListHomeCategory from "./ListCategory/ListHomeCategory";

function ListCategories() {
  return (
    <section className="body">
      {/* start: header */}
      
      <Header />
      {/* end: header */}
      <div className="inner-wrapper">
        {/* start: sidebar */}
        <aside id="sidebar-left" className="sidebar-left">
          <div className="sidebar-header">
            <SideBar />
          </div>
        </aside>
        {/* end: sidebar */}
        
       <ListHomeCategory/>
      
      </div>
    </section>
  );
}

export default ListCategories;
