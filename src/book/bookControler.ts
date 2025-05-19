import { NextFunction, Request, Response } from "express";
import path from "node:path";
import fs from "node:fs";
import cloudinary from "../config/cloudinary";
import bookModel from "./bookModel";
import createHttpError from "http-errors";
import { authRequest } from "../middleware/Authenticate";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  const { title, genre, description } = req.body;
  // console.log(req.files);

  try {
    const files = req.files as { [filename: string]: Express.Multer.File[] };
    const coverImageMimeType = files.coverImage[0].mimetype.split("/").at(-1);
    const fileName = files.coverImage[0].filename;
    const filePath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      fileName
    );
    const uploadsResult = await cloudinary.uploader.upload(filePath, {
      filename_override: fileName,
      folder: "book-cover",
      format: coverImageMimeType,
    });

    const bookFilename = files.file[0].filename;
    const bookFilepath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      bookFilename
    );
    const bookuploadsResult = await cloudinary.uploader.upload(bookFilepath, {
      resource_type: "raw",
      filename_override: bookFilename,
      folder: "book-pdf",
      format: "pdf",
    });
    // console.log("upload resultbook=", bookuploadsResult);
    // console.log("upload result=", uploadsResult);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    console.log("yoru req id is", req.userId);

    console.log("yoru req id is", req);

    const _req = req as authRequest;

    const newBook = await bookModel.create({
      title: title,
      genre: genre,
      description: description,
      author: _req.userId,
      coverImage: uploadsResult.secure_url,
      file: bookuploadsResult.secure_url,
    });

    try {
      //   delete temp file
      fs.promises.unlink(filePath);
      fs.promises.unlink(bookFilepath);
    } catch (error) {
      createHttpError(401, "Error while deleting temp file ");
    }

    res.status(201).json({ id: newBook._id });
  } catch (error) {
    createHttpError(401, "Error while uploading file in cloudinary ");
    return next();
  }
};

const bookUpdate = async (req: Request, res: Response, next: NextFunction) => {
  const { title, genre } = req.body;
  const bookId = req.params.bookId;

  const book = await bookModel.findOne({ _id: bookId });

  if (!book) {
    return next(createHttpError(401, "Book not found"));
  }
  const _req = req as authRequest;
  if (book.author.toString() !== _req.userId) {
    return next(createHttpError(403, "You can't update other book"));
  }

  const files = req.files as { [filename: string]: Express.Multer.File[] };
  // update cover image here
  let completeCoverImage = "";
  if (files.coverImage) {
    const coverImageMimeType = files.coverImage[0].mimetype.split("/").at(-1);
    const fileName = files.coverImage[0].filename;
    const filePath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      fileName
    );
    completeCoverImage = fileName;

    const updateResult = await cloudinary.uploader.upload(filePath, {
      filename_override: completeCoverImage,
      folder: "book-cover",
      format: coverImageMimeType,
    });
    completeCoverImage = updateResult.secure_url;
    await fs.promises.unlink(filePath);
  }

  let completeFileName = "";
  if (files.file) {
    const fileMimType = files.file[0].mimetype.split("/").at(-1);
    const bookFilename = files.file[0].filename;
    const filePath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      bookFilename
    );
    completeFileName = `${bookFilename}.${fileMimType}`;

    const updateFileResult = await cloudinary.uploader.upload(filePath, {
      filename_override: completeFileName,
      resource_type: "raw",
      folder: "book-pdf",
      format: "pdf",
    });
    completeFileName = updateFileResult.secure_url;
    await fs.promises.unlink(filePath);
  }

  const updateBook = await bookModel.findOneAndUpdate(
    {
      _id: bookId,
    },
    {
      title: title,
      genre: genre,
      coverImage: completeCoverImage ? completeCoverImage : book.coverImage,
      file: completeFileName ? completeFileName : book.file,
    },
    {
      new: true,
    }
  );

  res.json(updateBook);
};

const allBookList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // todo: add pagination.
    const book = await bookModel.find().populate("author", "name");
    res.json(book);
  } catch (err) {
    return next(createHttpError(500, "Error while getting a book"));
  }
};

const oneBookFind = async (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.bookId;

  try {
    const book = await bookModel
      .findOne({ _id: bookId })
      // populate author field
      .populate("author", "name");
    if (!book) {
      return next(createHttpError(404, "Book not found."));
    }

    return res.json(book);
  } catch (err) {
    return next(createHttpError(500, "Error while getting a book"));
  }
};

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.bookId;

  try {
    const book = await bookModel.deleteOne({
      _id: bookId,
    });
    res.json(book);
  } catch (error) {
    return next(createHttpError(401, "Error while deleteing book"));
  }
};

// import { NextFunction, Request, Response } from "express";
// import createHttpError from "http-errors";
// import bookModel from "./bookModel";

const paginationBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 5;

    const skip = (page - 1) * limit;

    const books = await bookModel
      .find()
      .populate("author", "name")
      .limit(limit)
      .skip(skip);

    const totalBooks = await bookModel.countDocuments();

    res.json({
      totalBooks,
      totalPages: Math.ceil(totalBooks / limit),
      currentPage: page,
      books,
    });
  } catch (err) {
    return next(createHttpError(500, "Error while getting books"));
  }
};

export {
  createBook,
  bookUpdate,
  allBookList,
  oneBookFind,
  deleteBook,
  paginationBook,
};
