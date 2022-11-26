export class Episode {
  constructor(
    public id: number,
    public name: string,
    public airDate: string,
    public episode: string,
    public characters: Array<string>,
    public url: string,
    public created: string
  ) {}
}
