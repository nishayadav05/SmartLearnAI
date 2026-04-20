import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function HelpCategory() {
  const { category } = useParams();
  const navigate = useNavigate();

  const [openIndex, setOpenIndex] = useState(null);

const data = {
  "getting-started": [
    {
      q: "How do I create an account?",
      a: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Click on the "Sign Up" button on the homepage.</li>
          <li>Enter your name, email address, and password.</li>
          <li>Submit the registration form.</li>
          <li>Check your email for a verification link.</li>
          <li>Click the link to activate your account.</li>
          <li>Log in and start exploring the platform.</li>
        </ul>
      )
    },
    {
      q: "How do I log in?",
      a: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Click on the "Login" button.</li>
          <li>Enter your registered email and password.</li>
          <li>Click on "Sign In".</li>
          <li>You will be redirected to your dashboard.</li>
          <li>Use "Forgot Password" if you cannot log in.</li>
        </ul>
      )
    },
    {
      q: "How do I start my first course?",
      a: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Log in to your account.</li>
          <li>Go to the "Courses" section.</li>
          <li>Browse and select a course.</li>
          <li>Click on "Enroll".</li>
          <li>Access the course from your dashboard.</li>
          <li>Start learning at your own pace.</li>
        </ul>
      )
    },
    {
      q: "Is there a free trial available?",
      a: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Visit the course page.</li>
          <li>Check if free preview is available.</li>
          <li>Access limited lessons for free.</li>
          <li>Evaluate course quality and content.</li>
          <li>Enroll fully if satisfied.</li>
        </ul>
      )
    },
    {
      q: "How does the platform work?",
      a: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Browse available courses.</li>
          <li>Enroll based on your interests.</li>
          <li>Access content from your dashboard.</li>
          <li>Track your learning progress.</li>
          <li>Complete courses and earn certificates.</li>
        </ul>
      )
    }
  ],

  "account-profile": [
    {
      q: "How do I edit my profile?",
      a: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Go to your profile page.</li>
          <li>Click on "Edit Profile".</li>
          <li>Update your personal details.</li>
          <li>Add profile photo or bio.</li>
          <li>Click "Save" to apply changes.</li>
        </ul>
      )
    },
    {
      q: "How can I change my password?",
      a: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Open account settings.</li>
          <li>Click on "Change Password".</li>
          <li>Enter current password.</li>
          <li>Enter a new secure password.</li>
          <li>Save the changes.</li>
        </ul>
      )
    },
    {
      q: "I forgot my password. What should I do?",
      a: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Go to login page.</li>
          <li>Click on "Forgot Password".</li>
          <li>Enter your email address.</li>
          <li>Check email for reset link.</li>
          <li>Create a new password.</li>
        </ul>
      )
    },
    {
      q: "How do I delete my account?",
      a: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Go to account settings.</li>
          <li>Find "Delete Account" option.</li>
          <li>Confirm your decision.</li>
          <li>Understand that data will be removed permanently.</li>
          <li>Proceed only if sure.</li>
        </ul>
      )
    },
    {
      q: "Can I update my email address?",
      a: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Open account settings.</li>
          <li>Enter new email address.</li>
          <li>Save changes.</li>
          <li>Verify email via confirmation link.</li>
        </ul>
      )
    }
  ],

  "courses": [
    {
      q: "How do I enroll in a course?",
      a: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Open course page.</li>
          <li>Review course details.</li>
          <li>Click "Enroll".</li>
          <li>Complete payment if required.</li>
          <li>Access from dashboard.</li>
        </ul>
      )
    },
    {
      q: "How can I track my progress?",
      a: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Go to dashboard.</li>
          <li>Select enrolled course.</li>
          <li>View completion percentage.</li>
          <li>Check completed lessons.</li>
          <li>Continue from last progress.</li>
        </ul>
      )
    },
    {
      q: "Can I download course materials?",
      a: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Open course content section.</li>
          <li>Look for downloadable files.</li>
          <li>Download PDFs or resources.</li>
          <li>Save for offline use.</li>
        </ul>
      )
    },
    {
      q: "Do courses provide certificates?",
      a: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Complete all lessons.</li>
          <li>Finish required assessments.</li>
          <li>Receive certificate.</li>
          <li>Download or share it.</li>
        </ul>
      )
    },
    {
      q: "Can I access courses anytime?",
      a: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Login to your account.</li>
          <li>Open dashboard.</li>
          <li>Select enrolled course.</li>
          <li>Access anytime.</li>
          <li>Learn at your own pace.</li>
        </ul>
      )
    }
  ],

  "payments": [
    {
      q: "What payment methods are accepted?",
      a: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Use credit or debit cards.</li>
          <li>Use UPI for quick payments.</li>
          <li>Use net banking.</li>
          <li>Choose available method based on region.</li>
        </ul>
      )
    },
    {
      q: "My payment failed. What should I do?",
      a: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Check internet connection.</li>
          <li>Verify payment details.</li>
          <li>Ensure sufficient balance.</li>
          <li>Try another method.</li>
          <li>Contact support if needed.</li>
        </ul>
      )
    },
    {
      q: "Can I get a refund?",
      a: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Check refund policy.</li>
          <li>Request within allowed time.</li>
          <li>Contact support team.</li>
          <li>Provide necessary details.</li>
        </ul>
      )
    },
    {
      q: "Is my payment information secure?",
      a: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Payments are encrypted.</li>
          <li>Secure gateways are used.</li>
          <li>Your data is protected.</li>
          <li>Industry standards are followed.</li>
        </ul>
      )
    }
  ],

  "technical": [
    {
      q: "The website is not loading properly.",
      a: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Refresh the page.</li>
          <li>Clear browser cache.</li>
          <li>Try another browser.</li>
          <li>Check internet connection.</li>
        </ul>
      )
    },
    {
      q: "Videos are not playing.",
      a: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Check internet speed.</li>
          <li>Update browser.</li>
          <li>Lower video quality.</li>
          <li>Try another browser.</li>
        </ul>
      )
    },
    {
      q: "I am facing login issues.",
      a: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Check login credentials.</li>
          <li>Reset password if needed.</li>
          <li>Clear browser cache.</li>
          <li>Try again later.</li>
        </ul>
      )
    },
    {
      q: "App is slow or crashing.",
      a: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Restart your device.</li>
          <li>Update the app.</li>
          <li>Reinstall the app.</li>
          <li>Check device performance.</li>
        </ul>
      )
    }
  ],

  "instructor": [
    {
      q: "How can I become an instructor?",
      a: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Go to instructor section.</li>
          <li>Submit application.</li>
          <li>Provide expertise details.</li>
          <li>Wait for approval.</li>
        </ul>
      )
    },
    {
      q: "How do I upload a course?",
      a: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Open instructor dashboard.</li>
          <li>Click "Create Course".</li>
          <li>Upload videos and content.</li>
          <li>Publish the course.</li>
        </ul>
      )
    },
    {
      q: "How do I earn money?",
      a: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Students enroll in your course.</li>
          <li>You earn per enrollment.</li>
          <li>Payments are processed periodically.</li>
        </ul>
      )
    },
    {
      q: "Can I edit my course later?",
      a: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Open instructor dashboard.</li>
          <li>Select your course.</li>
          <li>Edit content anytime.</li>
          <li>Update lessons or materials.</li>
        </ul>
      )
    }
  ]
};

  const categories = Object.keys(data);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-14 text-center">
        <h1 className="text-3xl font-bold capitalize">
          {category.replace("-", " ")}
        </h1>
      </div>

      <div className="max-w-6xl mx-auto flex gap-8 px-6 py-10">

        {/* Sidebar */}
        <div className="w-1/4 bg-white p-4 rounded-xl shadow">
          <p className="font-semibold mb-4">Categories</p>

          {categories.map((cat) => (
            <div
              key={cat}
              onClick={() => {
                setOpenIndex(null); // reset open question
                navigate(`/helpcategory/${cat}`);
              }}
              className={`p-2 rounded cursor-pointer capitalize mb-2 ${
                cat === category ? "bg-purple-100 font-semibold" : "hover:bg-gray-100"
              }`}
            >
              {cat.replace("-", " ")}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-6 capitalize">
            {category.replace("-", " ")}
          </h2>

          <div className="space-y-4">
            {data[category]?.map((item, i) => (
              <div key={i} className="border rounded-lg">

                {/* Question */}
                <div
                  onClick={() =>
                    setOpenIndex(openIndex === i ? null : i)
                  }
                  className="p-4 cursor-pointer flex justify-between items-center hover:bg-gray-50"
                >
                  <span>{item.q}</span>
                  <span>{openIndex === i ? "−" : "+"}</span>
                </div>

                {/* Answer */}
                {openIndex === i && (
                  <div className="px-4 pb-4 text-gray-600 text-sm leading-relaxed">
                  {item.a}
                </div>
                )}

              </div>
            ))} 
          </div>
        </div>

      </div>
    </div>
  );
}