import sendError from './error';

export function genericGetOne(model) {
  return async function getOne(req, res) {
    try {
      var id = req.params.id;
      var doc = await model.findById(id).exec();
      if (!doc) {
        return sendError(res, 'Not found in DB', 404);
      }
    } catch (e) {
      console.error(e);
      return sendError(res);
    }
    return res.status(200).json({ data: doc });
  };
}

export function genericGetMany(model) {
  return async function getMany(req, res) {
    try {
      var docs = await model.find().exec();
      if (!docs) {
        return sendError(res, 'Not found in DB', 404);
      }
    } catch (e) {
      console.error(e);
      return sendError(res);
    }
    return res.status(200).json({ data: docs });
  };
}

export function genericCreateOne(model) {
  return async function createOne(req, res) {
    try {
      var doc = await model.create({ ...req.body });
      return res.status(201).json({ data: doc });
    } catch (e) {
      console.error(e);
      return sendError(res);
    }
  };
}

export function genericUpdateOne(model) {
  return async function updateOne(req, res) {
    var id = req.params.id;
    var doc = await model.findByIdAndUpdate(id, req.body, { new: true }).exec();
    if (!doc) {
      return sendError(res, 'Not found in DB', 404);
    }
    res.status(200).json({ data: doc });
  };
}

export function genericRemoveOne(model) {
  return async function removeOne(req, res) {
    var id = req.params.id;
    var doc = await model.findByIdAndRemove(id).exec();
    if (!doc) {
      return sendError(res, 'Not found in DB', 404);
    }
    res.status(200).json({ data: doc });
  };
}

export function crudControllers(model) {
  return {
    removeOne: genericRemoveOne(model),
    updateOne: genericUpdateOne(model),
    getMany: genericGetMany(model),
    getOne: genericGetOne(model),
    createOne: genericCreateOne(model),
  };
}
