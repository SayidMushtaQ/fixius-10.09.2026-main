import DashboardLayout from "@/components/Common/DashboardLayout";
import { navigation } from "@/constants/Dashboard/handwerker";
interface LayoutProps {
	children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
	return (
		<DashboardLayout navigation={navigation}>{children}</DashboardLayout>
	);
}
