"use client";
import { useState } from "react";
import ClientProfile from "./components/ClientProfile";
export default function Index() {
	// const { toggleSideBar } = useContext(Context);
	const [search, set_search] = useState<string>(""); //user search query
	return <ClientProfile search={search} setSearch={set_search} />;
}
