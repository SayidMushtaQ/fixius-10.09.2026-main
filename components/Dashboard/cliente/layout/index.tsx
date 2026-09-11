import DashboardLayout from "@/components/Common/DashboardLayout";
import { navigation } from "@/constants/Dashboard/kunde";
import React from "react";
interface LayoutProps {
	children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	return (
		<div className="bg-mainBackground min-h-screen">
			<DashboardLayout navigation={navigation}>
				{children}
			</DashboardLayout>
		</div>
	);
}
