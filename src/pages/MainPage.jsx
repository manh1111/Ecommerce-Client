// components
import PageHeader from '@layout/PageHeader';
import TopProducts from './TopProducts';
import SellerProfilesGrid from '@widgets/SellerProfilesGrid';

const MainPage = () => {
  return (
    <>
      <PageHeader title="Discover" changePageName={false} />
      <div className="section">
        <div
          className="card no-hover flex flex-col gap-5 !p-5 mb-5 md:mb-[26px] md:!p-[26px] lg:!py-5 lg:flex-row
                   lg:items-center lg:gap-4"
        >
          <h1 className="flex-1 text-center lg:text-left">SHOP</h1>
        </div>
        <SellerProfilesGrid numberOfSellers={6} fullGrid={false}/>
      </div>

      <div className="section">
        <div
          className="card no-hover flex flex-col gap-5 !p-5 mb-5 md:mb-[26px] md:!p-[26px] lg:!py-5 lg:flex-row
                   lg:items-center lg:gap-4"
        >
          <h1 className="flex-1 text-center lg:text-left">TOP PRODUCT</h1>
        </div>
        <TopProducts hasTitle={false} />
      </div>
    </>
  );
};

export default MainPage; 