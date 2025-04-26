import mongooseConnection from '../../../../lib/mongoose';
import mockInterviewSchema from '../../../../model/mockInterview';

export async function GET(req, { params }) {
  try {
    await mongooseConnection();
    const { id } = params;

    // Fetch the interview by ID
    const interview = await mockInterviewSchema.findById(id);

    if (!interview) {
      return new Response(JSON.stringify({ success: false, message: "Interview not found" }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // For demonstration, let's assume "results" are a field in the interview document.
    // If not, adjust this as needed.
    const results = interview.results || { message: "No results available." };

    return new Response(JSON.stringify({ success: true, data: results }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error fetching interview results:", error);
    return new Response(JSON.stringify({ success: false, message: "Server error" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 