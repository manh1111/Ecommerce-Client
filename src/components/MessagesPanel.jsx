// components
import FilterItem from '@ui/FilterItem';
import DrawerBase from '@ui/DrawerBase';

// hooks
import useMeasure from 'react-use-measure';
import {useState, useEffect} from 'react';

// constants
import { ORDER_SORT_OPTIONS, PRODUCT_CATEGORIES} from '@constants/options';

// utils
import dayjs from 'dayjs';

// data placeholder
import messages from '@db/messages';
import OrdersTable from '@widgets/OrdersTable';
import Select from '@ui/Select';

const step = 6;

const MessagesPanel = ({open, onOpen, onClose}) => {
    const [headerRef, {height: headerHeight}] = useMeasure();
    const [footerRef, {height: footerHeight}] = useMeasure();
    const [filter, setFilter] = useState('all');
    const [displayed, setDisplayed] = useState(step);

    const latestMessages = messages.filter(message => dayjs(message.createdAt).isAfter(dayjs().subtract(1, 'day')));
    const archivedMessages = messages.filter(message => message.archived);

    useEffect(() => {
        setFilter('all');
        setDisplayed(step);
    }, [open]);

    const handleLoadMore = () => {
        setDisplayed(displayed + step);
    }

    const getQty = (category) => {
        if (category === 'all') return messages.length;
        if (category === 'latest') return latestMessages.length;
        if (category === 'archived') return archivedMessages.length;
    }

    const filteredData = () => {
        if (filter === 'all') return messages;
        if (filter === 'latest') return latestMessages
        if (filter === 'archived') return archivedMessages
    }
    
    const [category, setCategory] = useState(PRODUCT_CATEGORIES[0]);
    const [sort, setSort] = useState(ORDER_SORT_OPTIONS[0]);
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-[26px] md:col-span-2">
      <Select
        value={category}
        options={PRODUCT_CATEGORIES}
        onChange={setCategory}
        placeholder="Product category"
      />
      <Select
        value={sort}
        options={ORDER_SORT_OPTIONS}
        onChange={setSort}
        placeholder="Default sorting"
      />
    </div>;
    return (
      <DrawerBase open={open} onOpen={onOpen} onClose={onClose} anchor="right">
        <div className="py-8 px-[30px] pb-4" ref={headerRef}>
          <div className="flex justify-between items-center">
            <h5>Đơn hàng</h5>
            <button
              className="text-accent text-lg transition hover:text-red"
              onClick={onClose}
              aria-label="Close messages panel"
            >
              <i className="icon-circle-xmark-regular" />
            </button>
          </div>
        </div>
        <div
          className="h-full overflow-y-auto flex-1"
          style={{ height: `calc(100vh - ${headerHeight + footerHeight}px)` }}
        >
          <OrdersTable category={category} sort={sort} />
        </div>
        <div className="p-[30px]" ref={footerRef}>
          <button
            className="btn btn--secondary w-full"
            onClick={handleLoadMore}
            disabled={displayed >= filteredData().length}
          >
            Load More
          </button>
        </div>
      </DrawerBase>
    );
}

export default MessagesPanel