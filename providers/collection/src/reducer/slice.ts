import { PayloadAction, createSlice, type Slice } from "@reduxjs/toolkit";

import { emptyCollectionState } from "./empty";
import type { ICollectionState } from "./interfaces";
import { CollectionActions } from "./interfaces";

const initialState: ICollectionState = emptyCollectionState;

export const collectionSlice: Slice<ICollectionState> = createSlice({
  name: "collection",
  initialState,
  selectors: {
    collectionSelector: state => state,
  },
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsFilterOpen: (state, action: PayloadAction<boolean>) => {
      state.isFiltersOpen = action.payload;
    },
    setIsViewDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.isViewDialogOpen = action.payload;
    },
    setIsEditDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.isEditDialogOpen = action.payload;
    },
    setIsDeleteDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.isDeleteDialogOpen = action.payload;
    },
    setAction: (state, action: PayloadAction<CollectionActions>) => {
      state.action = action.payload;
    },
    setDidMount: (state, action: PayloadAction<boolean>) => {
      state.didMount = action.payload;
    },
    setSearch: (state, action: PayloadAction<any>) => {
      state.search = action.payload;
    },
    setRows: (state, action: PayloadAction<Array<any>>) => {
      state.rows = action.payload;
    },
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    setSelected: (state, action: PayloadAction<any>) => {
      state.selected = action.payload;
    },
    setNeedRefresh: (state, action: PayloadAction<boolean>) => {
      state.needRefresh = action.payload;
    },
    resetState: state => {
      state.isLoading = emptyCollectionState.isLoading;
      state.isFiltersOpen = emptyCollectionState.isFiltersOpen;
      state.isViewDialogOpen = emptyCollectionState.isViewDialogOpen;
      state.isEditDialogOpen = emptyCollectionState.isEditDialogOpen;
      state.isDeleteDialogOpen = emptyCollectionState.isDeleteDialogOpen;
      state.action = emptyCollectionState.action;
      state.didMount = emptyCollectionState.didMount;
      state.search = emptyCollectionState.search;
      state.rows = emptyCollectionState.rows;
      state.count = emptyCollectionState.count;
      state.selected = emptyCollectionState.selected;
      state.needRefresh = emptyCollectionState.needRefresh;
    },
  },
});

export const collectionActions = collectionSlice.actions;

export const { collectionSelector } = collectionSlice.selectors as any;
