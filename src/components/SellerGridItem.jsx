// components
import Spring from '@components/Spring';

// hooks
import {useNavigate} from 'react-router-dom';

const SellerGridItem = ({ seller, index, id }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => navigate(`/shop/${id}`);

  return (
    <Spring
      className="card flex items-start gap-1.5 !pt-[22px] !pr-5 !pb-6 !pl-6 m-2"
      type="slideUp"
      index={index}
    >
      <div
        className="h-full w-full bg-white rounded-lg flex flex-1 items-center justify-center cursor-pointer"
        onClick={handleLogoClick}
      >
        <div className="w-full h-[100px] flex items-center justify-center">
          <img
            className="h-full w-full object-cover" 
            src={seller?.logo}
            alt={seller?.name}
          />
        </div>
      </div>
    </Spring>
  );
};

export default SellerGridItem;
