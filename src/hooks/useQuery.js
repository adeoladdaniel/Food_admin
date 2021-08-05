export const useQuery = (location) => {
  return new URLSearchParams(location.search);
};
