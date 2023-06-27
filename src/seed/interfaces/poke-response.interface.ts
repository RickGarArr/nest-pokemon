export interface IPokeResponse {
    count: number;
    next: string;
    previous: any;
    results: IBasicPokeInfo[];
}

export interface IBasicPokeInfo {
    name: string;
    url: string;
}