import React, { useState } from "react";
import { Box, Select } from "native-base";

type Props = {
  sort: string;
  handleSort: (sort: string) => void;
};

const SortDropdown: React.FC<Props> = ({ handleSort, sort }: Props) => {
  return (
    <Box width={"55%"}>
      <Select
        selectedValue={sort}
        w={"100%"}
        accessibilityLabel="Sort by"
        placeholder="Sort by"
        _selectedItem={{
          bg: "primary.600",
        }}
        color={"gray.300"}
        _item={{ bg: "gray.800", rounded: "2xl", _text: { color: "gray.200" }, _pressed: { bg: "gray.700" } }}
        _actionSheetContent={{
          bg: "gray.800",
        }}
        rounded={"lg"}
        borderColor={"gray.400"}
        onValueChange={(itemValue) => {
          handleSort(itemValue);
        }}
      >
        <Select.Item label="Created: Ascending" value="createdAt asc" />
        <Select.Item label="Created: Descending" value="createdAt desc" />
      </Select>
    </Box>
  );
};

export default SortDropdown;
