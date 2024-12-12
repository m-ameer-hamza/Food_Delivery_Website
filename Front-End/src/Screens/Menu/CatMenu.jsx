import { useEffect } from "react";
import { useQuery } from "react-query";
import { useMenuApi } from "../../../customHooks/useMenuApi";
import LoadingCard from "../../components/LoadingCard";
import SliderCards from "../../components/SliderCards";
function CatMenu({ page, catName }) {
  const { getMenuByCategory } = useMenuApi();
  const { isLoading, isError, data } = useQuery(
    ["menuCat23", catName, page],
    () => {
      return getMenuByCategory(catName, page);
    }
  );

  useEffect(() => {
    if (data) {
      console.log("Fetched data:", data);
    }
  }, [data]);

  const loadingArray = ["", "", ""];
  return (
    <>
      {isLoading
        ? loadingArray.map((_, idx) => <LoadingCard key={idx} />)
        : data.data.map((item) => <SliderCards key={item._id} item={item} />)}
    </>
  );
}

export default CatMenu;
