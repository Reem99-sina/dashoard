import * as React from "react";
import {
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { Typography, Box } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
// import "./index.css"
function CustomPagination(props:{pagination:{
  length: number;page:number,pageCount:number
}, onPageChange:any}) {
  const { pagination, onPageChange } = props;
  const apiRef = useGridApiContext();
  let { t } = useTranslation("common");
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%",overflowX: {md:"hidden", sm: "hidden", xs:"scroll"} }}>
        <Pagination
          color="primary"
          variant="text"
          shape="rounded"
          page={pagination?.page + 1}
          count={Math.floor(pagination?.pageCount / 8)}
          // @ts-expect-error
          renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
          onChange={(event:React.ChangeEvent<any>, value) => {
            onPageChange((prev:any) => ({ ...prev, page: value - 1 }));
          
          }}
        />
        <Typography component={"p"} sx={{ fontSize: "14px", mx: 2 , color:"#191B1C", textWrap:"nowrap"}}>
          {t("Showing")} {(pagination?.page + 1) * pagination?.length} {t("to")} {(pagination?.page + 1) * 8} {t("of")}{" "}
          {pagination?.pageCount} {t("entries")}
        </Typography>
      </Box>
    </>
  );
}
export default CustomPagination;

CustomPagination.propTypes = {
  pagination: PropTypes.object,
  onPageChange: PropTypes.func,
};