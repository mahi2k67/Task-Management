import { connectDB } from "@/lib/mongodb";
import Task from "@/models/Task";


// GET all tasks
export async function GET() {
  try {
    await connectDB();

    const tasks = await Task.find();

    return Response.json(tasks);

  } catch (error) {
    console.log(error);

    return Response.json(
      { message: "Error fetching tasks" },
      { status: 500 }
    );
  }
}


// CREATE task
export async function POST(req: Request) {
  try {
    await connectDB();

    const { title, description, priority } =
      await req.json();

    const task = await Task.create({
      title,
      description,
      priority,
    });

    return Response.json(task, {
      status: 201,
    });

  } catch (error) {
    console.log(error);

    return Response.json(
      { message: "Error creating task" },
      { status: 500 }
    );
  }
}


// UPDATE task
export async function PUT(req: Request) {
  try {
    await connectDB();

    const { id, status } = await req.json();

    const updatedTask =
      await Task.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );

    return Response.json(updatedTask);

  } catch (error) {
    console.log(error);

    return Response.json(
      { message: "Error updating task" },
      { status: 500 }
    );
  }
}


// DELETE task
export async function DELETE(req: Request) {
  try {
    await connectDB();

    const { id } = await req.json();

    await Task.findByIdAndDelete(id);

    return Response.json({
      message: "Task deleted",
    });

  } catch (error) {
    console.log(error);

    return Response.json(
      { message: "Error deleting task" },
      { status: 500 }
    );
  }
}