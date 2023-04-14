import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    try {
      const place = await Place.findById(id);

      return response.status(200).json(place);
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }
  if (request.method === "PATCH") {
    const updatePlace = request.body;
    await Place.findByIdAndUpdate(id, {
      $set: updatePlace,
    });
    response.status(200).json({ status: `Place ${id} successfully update.` });
  }
  if (request.method === "DELETE") {
    await Place.findByIdAndDelete(id);
    response.status(200).json({ status: `Place ${id} successfully delete.` });
  }
}
