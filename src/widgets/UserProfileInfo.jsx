import Spring from '@components/Spring';
import { getProfileOwn } from "@api/profile";
import { getCookie } from "@utils/cookie";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const UserProfileInfo = () => {
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(true);

    // Fetch user data on component mount
    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        const token = JSON.parse(getCookie('user_login'));
        if (token) {
            try {
                const userData = await getProfileOwn();
                setUserInfo(userData);
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        } else {
            console.error("User token not found");
            setLoading(false);
        }
    };

    const handleDownloadExcel = () => {
      if (userInfo && Object.keys(userInfo).length > 0) {
          try {
              // Convert userInfo object into an array of key-value pairs
              const formattedData = Object.entries(userInfo).map(([key, value]) => [
                  key,
                  typeof value === "object" ? JSON.stringify(value) : value,
              ]);
  
              // Add headers for the table
              const data = [["Field", "Value"], ...formattedData];
  
              // Create worksheet
              const worksheet = XLSX.utils.aoa_to_sheet(data);
  
              // Adjust column widths to fit content
              const maxFieldWidth = Math.max(
                  ...formattedData.map(([key]) => key.length),
                  "Field".length
              );
              const maxValueWidth = Math.max(
                  ...formattedData.map(([, value]) => (value ? value.length : 10)),
                  "Value".length
              );
              worksheet["!cols"] = [
                  { wch: maxFieldWidth + 2 }, 
                  { wch: maxValueWidth + 10 }, 
              ];
  
              // Create workbook and append worksheet
              const workbook = XLSX.utils.book_new();
              XLSX.utils.book_append_sheet(workbook, worksheet, "Profile");
  
              // Write and save Excel file
              const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
              const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
              saveAs(blob, "UserProfileInfo.xlsx");
          } catch (error) {
              console.error("Error generating Excel file:", error);
          }
      } else {
          console.warn("Dữ liệu người dùng không khả dụng");
      }
     };
  
  
    if (loading) {
        return <div className="text-center">Loading user information...</div>;
    }

    return (
        <Spring className="card flex items-center p-6 shadow-lg rounded-lg">
            <div className="flex flex-col gap-5 w-full">
                {/* Email */}
                <div className="flex items-center gap-4 w-full text-white py-2 px-4">
                    <span className="icon-wrapper mt-1 text-black">
                        <i className="icon icon-envelope-solid" />
                    </span>
                    <span className="text-black">{userInfo?.email || "Email not available"}</span>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4 w-full text-white py-2 px-4">
                    <span className="icon-wrapper mt-1 text-black.5">
                        <i className="icon icon-location-dot-solid" />
                    </span>
                    <span  className="text-black"> 
                        {userInfo?.address?.find((item) => item.isDefault)?.address || 
                         userInfo?.address?.[0]?.address || 
                         "Address not available"}
                    </span>
                </div>

                {/* Phone Number */}
                <div className="flex items-center gap-4 w-full text-white py-2 px-4">
                    <span className="icon-wrapper mt-1 text-black">
                        <i className="icon icon-mobile-solid" />
                    </span>
                    <span className="text-black">{userInfo?.phoneNumber || "Phone number not available"}</span>
                </div>

                {/* Download Button */}
                <button 
                    className="flex items-center gap-4 w-full text-black py-2 px-4 hover:bg-blue-500 rounded-md  disabled:bg-gray-300" 
                    onClick={handleDownloadExcel}
                    disabled={!userInfo || Object.keys(userInfo).length === 0}
                >
                    <span className="icon-wrapper mt-1 text-black">
                        <i className="icon icon-file-arrow-down-solid" />
                    </span>
                    Download Excel File
                </button>
            </div>
        </Spring>
    );
};

export default UserProfileInfo;
