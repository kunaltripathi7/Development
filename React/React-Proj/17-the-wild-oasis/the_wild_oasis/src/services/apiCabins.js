// same services file per table category.
import supabase, { supabaseUrl } from "./supabase";
export async function getCabins() {
  // returns an obj with data & error
  // supabase is an obj. which have from func -> which itself have select func in backend.
  let { data, error } = await supabase.from("cabins").select("*");

  // log in console as well
  if (error) {
    console.log(error);
    throw new Error("Data could not be loaded");
  }
  return data;
}

export async function deleteCabins(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Data could not be loaded");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  // optional image upload on edit
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  ); // o/w it will create new folders;

  // linking the path to bucket in cabin table
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  // selecting all cols
  const { data, error } = await query.select().single(); // .single() is used to fetch first row of all cols, required if you immediately want the row data that is just inserted.

  if (error) {
    console.log(error);
    throw new Error("Data could not be loaded");
  }

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    // if image was not uploaded then delete the cabin
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error("Image can't be uploaded and Cabin was not created");
  }

  return data;
}
