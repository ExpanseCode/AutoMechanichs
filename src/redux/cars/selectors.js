export const selectCars = state => state.cars.cars;

export const selectCarInfo = state => state.cars.carInfo;

export const selectNodesAndPartsForDiagnostics = state =>
  state.cars.nodesAndPartsForDiagnostics;

export const selectDiagnostic = state => state.cars.diagnostic;

export const selectDate = state => state.cars.chosenDate;

export const selectRepair = state => state.cars.repairDetails;

export const selectNewCar = state => state.cars.newCar;

// Loaders

export const selectIsLoading = state => state.cars.isLoading;

export const selectIsRecognitionLoading = state =>
  state.cars.isRecognitionLoading;

export const selectIsDiagLoading = state => state.cars.isDiagLoading;

export const selectIsDiagCreateLoading = state =>
  state.cars.isDiagCreateLoading;

export const selectIsSavingCarLoading = state =>
  state.cars.isSavingCarLoading;

export const selectError = state => state.cars.error;
