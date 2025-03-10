export const fetchProductData = async () => {
    try {
        const response = await fetch("http://localhost:5000/api/products/fetchProductData", { 
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch product data");
        }

        const data = await response.json();
        console.log("Fetched Products from API:", data); 
        return data;
    } catch (error) {
        console.error("Error:", error);
        return { error: error.message };
    }
};
export const fetchFilteredProducts = async (priceRange) => {
    try {
        console.log("Fetching with Price Range:", priceRange);

        const response = await fetch(`http://localhost:5000/api/products/fetchFilteredProducts?minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch filtered products: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Filtered Products:", data);
        return data;
    } catch (error) {
        console.error("Error fetching filtered products:", error);
        return { error: "Failed to fetch products" };
    }
};

export const fetchFilteredProductsByRating = async (minRating) => {
    try {
        console.log("Fetching products with Rating:", minRating);

        const response = await fetch(
            `http://localhost:5000/api/products/fetchFilteredProductsByRating?minRating=${minRating}`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch filtered products: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Filtered Products by Rating:", data);
        return data;
    } catch (error) {
        console.error("Error fetching filtered products by rating:", error);
        return { error: "Failed to fetch products" };
    }
};
