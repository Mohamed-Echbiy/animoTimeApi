const db = require("../schema/streamLinks");

const getLinks = async (req, res) => {
  //   const { name } = req.params;
  const { Idname } = req.params;
  try {
    const getData = await db.find({ name: Idname });
    // lets check if the the requested episode data is available
    const isItValid = !!getData.length;
    console.log(isItValid, "isItValid");
    if (isItValid) {
      return res.status(200).json({ data: getData });
    } else {
      console.log("else condition");
      res.status(404).json({ data: [] });
      const request = await fetch(
        `https://api.streamsb.com/api/folder/list?key=68697e62xykeg6hi0rcsi`
      );
      const response = await request.json();
      console.log(request.status, "request status else statment");
      // filter response to see if we can find anime video id available
      const filterRes = await findVideoFolder(response, Idname);
      console.log(filterRes, "filterRes to see the video available");
      if (filterRes) {
        console.log("we find the id in the video dtabase");
        return AddToDb(response, Idname);
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
};

async function findVideoFolder(params, Idname) {
  console.log("params", params.result.folders, Idname);
  const filterRes = params.result.folders.filter((id) => id.name === Idname);
  console.log(filterRes, "video");
  const isItValid = !!filterRes.length;
  return isItValid;
}

async function AddToDb(response, Idname) {
  try {
    const filterRes = response.result.folders.filter(
      (id) => id.name === Idname
    );
    const fld_id =
      filterRes.length > 0 ? filterRes[0].fld_id : process.exitCode(1);
    const req = await fetch(
      `https://api.streamsb.com/api/folder/list?key=68697e62xykeg6hi0rcsi&fld_id=${fld_id}`
    );
    console.log(req.status);
    const res = await req.json();
    const files = res.result.files.sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();

      if (titleA < titleB) {
        return -1;
      }

      if (titleA > titleB) {
        return 1;
      }

      return 0;
    });

    const body = { links: files, name: Idname };

    console.log(body, "the body that we try to upload");

    const addToDb = await db.create(body);
    console.log("created succefully");
    return;
  } catch (error) {
    console.log(error);
    return;
  }
}

module.exports = { getLinks };
