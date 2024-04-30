import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();
  return (
    <ul>
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export async function loader() {
  // convention to make loader func. inside the compo
  const menu = await getMenu();
  // console.log(menu);
  return menu;
}

export default Menu;

// render as you fetch(rendering the route & fetching parallely) vs in useEffect mech -> fetch on render which could create data loading waterfall -> cuz its sequential which may cause delays
