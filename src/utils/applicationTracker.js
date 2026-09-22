const APPLICATIONS_KEY = "scholarmatch_applications";

export const getApplications = () => {
  try {
    const applications = localStorage.getItem(APPLICATIONS_KEY);
    return applications ? JSON.parse(applications) : [];
  } catch (error) {
    console.error("Unable to read applications:", error);
    return [];
  }
};

export const getApplicationStatus = (id, type) => {
  const applications = getApplications();

  const application = applications.find(
    (item) => item.id === id && item.type === type
  );

  return application ? application.status : "Saved";
};

export const updateApplicationStatus = (item, status) => {
  const applications = getApplications();

  const existingIndex = applications.findIndex(
    (application) =>
      application.id === item.id && application.type === item.type
  );

  const applicationData = {
    id: item.id,
    type: item.type,
    name: item.name || item.title,
    image: item.image,
    provider: item.provider || item.organization,
    status,
    updatedAt: new Date().toISOString(),
  };

  if (existingIndex >= 0) {
    applications[existingIndex] = {
      ...applications[existingIndex],
      ...applicationData,
    };
  } else {
    applications.push(applicationData);
  }

  localStorage.setItem(
    APPLICATIONS_KEY,
    JSON.stringify(applications)
  );

  return applications;
};

export const removeApplication = (id, type) => {
  const applications = getApplications();

  const updatedApplications = applications.filter(
    (application) =>
      !(application.id === id && application.type === type)
  );

  localStorage.setItem(
    APPLICATIONS_KEY,
    JSON.stringify(updatedApplications)
  );

  return updatedApplications;
};

export const clearApplications = () => {
  localStorage.removeItem(APPLICATIONS_KEY);
};