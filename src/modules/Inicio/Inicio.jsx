import { useState, useEffect } from "react";
import "../../assets/styles/Inicio/inicio.css";
import PostsSection from "../PostsSection/index";
import ImpactEnterprises from "../../components/ImpactEnterprises";
import CategoriesGrid from "../../components/CategoriesGrid";
import SuppliersSection from "../SuppliersSection";
import SearchByChildren from "../../components/SearchFlexible";
import useGetAll from "../../utils/services/hooks/useGetAll";
import useVisitorLocation from "../../utils/services/hooks/useLocation";
import UbicationModal from "../modals/ubication/Ubication";

export default function Inicio() {
  const { location, allowsLocation } = useVisitorLocation();
  const [suppliers, setSuppliers] = useState(null);

  const { data } = useGetAll({
    url: allowsLocation
      ? `location/${location?.latitude}/${location?.longitude}/${allowsLocation}`
      : `supplier?size=4&pageNumber=0`,
    needsAuth: false,
  });

  useEffect(() => {
    if (data) {
      setSuppliers(data?.data);
    }
  }, [allowsLocation, location, data]);

  return (
    <div>
      {allowsLocation === null && <UbicationModal />}
      <SearchByChildren>
        <ImpactEnterprises />
        <SuppliersSection suppliers={suppliers} />
        <CategoriesGrid />
        <PostsSection />
      </SearchByChildren>
    </div>
  );
}
