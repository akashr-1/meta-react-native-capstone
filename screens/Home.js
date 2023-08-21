import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Text, View, StyleSheet, SectionList, Image } from "react-native";
import { Searchbar } from "react-native-paper";
import debounce from "lodash.debounce";
import Filters from "../components/Filters";
import MenuItem from "../components/MenuItem";
import { getMenuItems, filterByQueryAndCategories } from "../database";
import { getSectionListData, useUpdateEffect } from "../utils/utils";

const sections = ["starters", "mains", "desserts"];

const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [searchBarText, setSearchBarText] = useState("");
  const [query, setQuery] = useState("");
  const [filterSelections, setFilterSelections] = useState(
    sections.map(() => false)
  );

  useEffect(() => {
    (async () => {
      try {
        const menuItems = await getMenuItems();
        const sectionListData = getSectionListData(menuItems);
        setData(sectionListData);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  useUpdateEffect(() => {
    (async () => {
      const activeCategories = sections.filter((s, i) => {
        if (filterSelections.every(item => item === false)) {
          return true;
        }
        return filterSelections[i];
      });
      try {
        const menuItems = await filterByQueryAndCategories(
          query,
          activeCategories
        );
        const sectionListData = getSectionListData(menuItems);
        setData(sectionListData);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [filterSelections, query]);

  const lookup = useCallback(q => {
    setQuery(q);
  }, []);

  const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

  const handleSearchChange = text => {
    setSearchBarText(text);
    debouncedLookup(text);
  };

  const handleFiltersChange = index => {
    const arrayCopy = [...filterSelections];
    arrayCopy[index] = !filterSelections[index];
    setFilterSelections(arrayCopy);
  };

  return (
    <View style={styles.container}>
      {/* Your header component here */}
      
      <View style={styles.heroSection}>
        {/* Your hero section content here */}
        
        <Searchbar
          placeholder="Search"
          onChangeText={handleSearchChange}
          value={searchBarText}
          style={styles.searchBar}
        />
      </View>
      
      <Filters
        selections={filterSelections}
        onChange={handleFiltersChange}
        sections={sections}
      />
      
      <SectionList
        style={styles.sectionList}
        sections={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <MenuItem item={item} />
        )}
        renderSectionHeader={({ section: { name } }) => (
          <Text style={styles.itemHeader}>{name}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // Additional styles here
  },
  heroSection: {
    // Additional hero section styles here
  },
  searchBar: {
    // Additional search bar styles here
  },
  // Additional styles for other components
});

export default HomeScreen;
