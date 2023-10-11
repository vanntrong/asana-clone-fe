/* eslint-disable react-hooks/exhaustive-deps */
import useQueryParams from "@/hooks/useQueryParams";
import { advanceFilters } from "@/modules/home/configs/homeConfig";
import {
  AdvanceFilterSelected,
  FilterParamKeys,
} from "@/modules/home/types/homeType";
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface FilterTaskContext {
  isAdvancedFilter?: boolean;
  setIsAdvancedFilter?: React.Dispatch<React.SetStateAction<boolean>>;
  advanceFilterSelected?: Array<{ key: string; value?: string | string[] }>;
  setAdvanceFilterSelected?: React.Dispatch<
    React.SetStateAction<
      {
        key: string;
        value?: string | string[];
      }[]
    >
  >;
  filterLength?: number;
  setFilterLength?: React.Dispatch<React.SetStateAction<number>>;
}

const FilterTaskContext = createContext<FilterTaskContext>({});

export const useFilterTaskContext = () => useContext(FilterTaskContext);

export const FilterTaskProvider: FC<PropsWithChildren> = ({ children }) => {
  const { searchParams } = useQueryParams();

  const [isAdvancedFilter, setIsAdvancedFilter] = useState<boolean>(
    searchParams.get(FilterParamKeys.IS_ADVANCE_FILTER) === "true"
  );
  const [advanceFilterSelected, setAdvanceFilterSelected] = useState<
    Array<AdvanceFilterSelected>
  >([]);

  useEffect(() => {
    if (searchParams.get(FilterParamKeys.IS_ADVANCE_FILTER) !== "true") {
      return;
    }

    const currentFilterInUrl: Array<AdvanceFilterSelected> = [];

    advanceFilters.forEach((filter) => {
      if (searchParams.has(filter.value)) {
        currentFilterInUrl.push({
          key: filter.value,
          value: searchParams.get(filter.value) as string,
        });
      }
    });
    setAdvanceFilterSelected(currentFilterInUrl);
  }, []);

  const values = useMemo(() => {
    return {
      isAdvancedFilter,
      setIsAdvancedFilter,
      advanceFilterSelected,
      setAdvanceFilterSelected,
    };
  }, [isAdvancedFilter, advanceFilterSelected]);

  return (
    <FilterTaskContext.Provider value={values}>
      {children}
    </FilterTaskContext.Provider>
  );
};
