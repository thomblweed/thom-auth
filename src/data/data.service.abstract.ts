export interface DataService<DataType, IdType> {
  getTotal(): Promise<number>;
  addMany(data: DataType[]): Promise<void>;
  addOne(data: DataType): Promise<void | (IdType | undefined)>;
  findById(id: IdType): Promise<DataType | undefined>;
}
