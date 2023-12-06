import kenyanCounties from '../utils/kenyan-counties';

const formattedCountries = kenyanCounties.map((county) => ({
  value: county.code,
  label: county.name,
  flag: county.flag,
  latlng: county.latlng,
  region: county.region,
}));

const useCountries = () => {
  const getAll = () => formattedCountries;

  const getByValue = (value) => {
  
    return formattedCountries.find((item) => item.value === value);
  }

  return {
    getAll,
    getByValue
  }
};

export default useCountries;