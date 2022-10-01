const initialState = {
  dogs: [],
  allDogs: [],
  temperaments: [],
  orderFilter: {
    order: "all",
    filterTemps: "all",
    filterApiDb: "all",
  },
};
function RootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_DOGS":
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };
    case "GET_DOGS_NAME":
      return {
        ...state,
        dogs: [action.payload],
      };
    case "GET_TEMPERAMENTS":
      return {
        ...state,
        temperaments: action.payload,
      };
    case "FILTER_BY_TEMPERAMENT": //FILTRO TODOS LOS PERROS, DSP POR LOS PERROS, Y DSP ORDENO.
      const allDogs = state.dogs;
      let temperament = action.payload;

      const temperamentFiltered =
        temperament === "all"
          ? allDogs
          : allDogs.filter((el) => {
              return el.temperament?.find((el2) => el2.name == temperament); //PENDIENTE ARREGLAR EL SORT Y EL FILTER JUNTOS.(TEMPORAL)
            });
      return {
        ...state,
        dogs: temperamentFiltered,
        orderFilter: {
          ...state.orderFilter,
          filterTemps: temperament,
        },
      };
    case "FILTER_CREATED":
      const allDogs2 = state.allDogs;
      const FilterDogs =
        action.payload === "created"
          ? allDogs2.filter((el) => el.createdInDb)
          : allDogs2.filter((el) => !el.createdInDb);
      return {
        ...state,
        Dogs: action.payload === "all" ? state.allDogs : FilterDogs,
        orderFilter: {
          ...state.orderFilter,
          FilterApiDB: action.payload,
        },
      };

    case "ORDER":
      let sort = [];
      let order = action.payload;
      if (order == "all")
        return {
          ...state,
          orderFilter: {
            ...state.orderFilter,
            order: "all",
          },
        };
      if (order == "asc") {
        sort = state.dogs.sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          }
          return 0;
        });
      }
      if (order == "dsc") {
        sort = state.dogs.sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return -1;
          }
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return 1;
          }
          return 0;
        });
      }
      if (order == "minwgt") {
        sort = state.dogs.sort((a, b) => {
          return (
            a.weight.metric.replace(/\s+/g, "").split("-")[1] -
            b.weight.metric.replace(/\s+/g, "").split("-")[1]
          );
        });
      }
      if (order == "maxwgt") {
        sort = state.dogs.sort(
          (a, b) =>
            b.weight.metric.replace(/\s+/g, "").split("-")[1] -
            a.weight.metric.replace(/\s+/g, "").split("-")[1]
        );
      }
      return {
        ...state,
        Dogs: [...sort],
        orderFilter: {
          ...state.orderFilter,
          order: order,
        },
      };
    default:
      return state;
  }
}

export default RootReducer;
