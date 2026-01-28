import { Outlet, createRootRoute, Link } from "@tanstack/react-router";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export const Route = createRootRoute({
  component: () => (
    <>
      <nav className="border-b bg-neutral-800 text-white w-full h-16 flex items-center ">
        <NavigationMenu className="flex gap-4 px-4">
          <NavigationMenuList className="hover:bg-white hover:text-black   rounded">
            <Link to="/">Add Work</Link>
          </NavigationMenuList>
          <NavigationMenuList className="hover:bg-white hover:text-black rounded">
            <Link to="/dash">Dashboard</Link>
          </NavigationMenuList>
        </NavigationMenu>
        <NavigationMenu>
          <NavigationMenuList className="hover:bg-white hover:text-black rounded">
            <Link to='/profile'>Profile</Link>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
      <Outlet />
    </>
  ),
});
