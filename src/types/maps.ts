export type mapsType = {
  data: [
    {
      uuid: string;
      displayName: string;
      displayIcon: string;
      liveViewIcon: string;
      splash: string;
      assetPath: string;
      mapUrl: string;
      xMultiplier: number;
      yMultiplier: number;
      yScalarToAdd: number;
      xScalarToAdd: number;
      callouts: [
        {
          regionName: string;
          superRegionName: string;
          location: {
            x: number;
            y: number;
          };
        }
      ];
    }
  ];
};
