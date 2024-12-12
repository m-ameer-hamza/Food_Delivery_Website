import { useQuery } from "react-query";
import { useMenuApi } from "../../../customHooks/useMenuApi";
import LoadingCard from "../../components/LoadingCard";
import SliderCards from "../../components/SliderCards";
function AllMenu() {
  const { getMenu } = useMenuApi();
  const { isLoading, isError, data } = useQuery("menuItems", getMenu);
  const loadingArray = ["", "", ""];
  return (
    <>
      {isLoading
        ? loadingArray.map((_, idx) => <LoadingCard key={idx} />)
        : data.data.map((item) => <SliderCards key={item._id} item={item} />)}
    </>
  );
}

export default AllMenu;
