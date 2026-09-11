import DashboardLayout from "@/components/Common/DashboardLayout";
import { navigation } from "@/constants/Dashboard/admin";
import React from "react";
interface LayoutProps {
	children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
	return (
		<div >
			<DashboardLayout navigation={navigation.client}>
				{children}
			</DashboardLayout>
		</div>
	);
}
