// * global
declare global {
  interface Navigator {
    msSaveOrOpenBlob: (blob: Blob, fileName: string) => void;
    browserLanguage: string;
  }
  interface Window {
    tmapCallback: () => void;
    ClusterBubble: any;
    TMap: any;
    marker: any;
    map: any;
    markerCluster: any;
  }
}

export {};
