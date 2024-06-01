import axios from 'axios';
import SummaryApi from '../comman';

const fetchCategoryWise = async (category) => {
  try {
    console.log('Fetching category:', category);
    const response = await axios.post(SummaryApi.category_wise_product, { category });
    console.log('Response:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching category data:', error);
    return null; // or return []; if you want to return an empty array
  }
};

export default fetchCategoryWise;
