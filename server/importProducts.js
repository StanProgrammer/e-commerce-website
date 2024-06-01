

const fetchAndListCategories = async () => {
  try {
    const fetch = await import('node-fetch');
    const response = await fetch.default("https://fakestoreapi.in/api/products?limit=150");
    const productsData = await response.json();
    const products = productsData.products
    

    if (!Array.isArray(products)) {
      throw new Error('Fetched data is not an array');
    }

    const categories = [...new Set(products.map(product => product.category))];
    console.log('Categories:', categories);
  } catch (error) {
    console.error('Error fetching products or listing categories:', error);
  } finally {
    mongoose.connection.close();
  }
};

fetchAndListCategories();
