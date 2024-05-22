import supabase from "./supabase";

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }
  return data;
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting) {
  console.log(newSetting);
  const { data, error } = await supabase
    .from("settings")
    .update(newSetting) // we only need to pass whatever needs to be updated only
    // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
    .eq("id", 2)
    .single(); // not working cuz the query returns zero rows cuz id wasn't matching up

  if (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }
  return data;
}
