import {
    Sidebar as ShadSidebar,
    SidebarFooter,
    SidebarMenu,
    SidebarMenuItem,
    SidebarProvider,
} from '../ui/sidebar';
import UserAvatarMenu from './UserAvatarMenu';

const Sidebar = () => {
    return (
        <SidebarProvider
            style={
                {
                    '--sidebar-width-icon': '4rem',
                } as React.CSSProperties
            }
            open={false}
        >
            <ShadSidebar collapsible='icon'>
                <SidebarFooter className='flex flex-col h-full justify-end'>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <UserAvatarMenu />
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </ShadSidebar>
        </SidebarProvider>
    );
};

export default Sidebar;
