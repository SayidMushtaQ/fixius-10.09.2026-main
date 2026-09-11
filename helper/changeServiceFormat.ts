export const changeServiceFormat = (input: string) => {
    const output1 = input
        .split(/[-\s]+/)
        .map((data) => {
            if (data.toLowerCase() === "de") {
                return "de";
            }
            return data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
        })
        .join(" ");

    return output1;
};
