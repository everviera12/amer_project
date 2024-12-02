export async function getData<DataType>(
  setData: React.Dispatch<React.SetStateAction<DataType>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string>>,
  url: string,           // URL de la API
  db_table: string       // Nombre de la tabla
) {
  try {
    setLoading(true);
    const response = await fetch(`${url}?table=${db_table}`);  // Pasamos el nombre de la tabla en la URL
    
    if (!response.ok) {
      throw new Error("Error fetching data");
    }
    
    const api_response = await response.json();
    
    setData(api_response.client as DataType);  // Aquí asignamos el tipo genérico
  } catch (error) {
    setError("Failed to fetch data");
    console.error("Failed to fetch data", error);
  } finally {
    setLoading(false);
  }
}
