import pandas as pd
import re

# ----------------------------
# Load Dataset
# ----------------------------
df = pd.read_csv("dataset/movies.csv")

# Replace all NaN values
df = df.where(pd.notnull(df), None)

print("Original Shape:", df.shape)

# ----------------------------
# Fill Missing Values
# ----------------------------
text_columns = [
    "MOVIES",
    "YEAR",
    "GENRE",
    "ONE-LINE",
    "STARS",
    "Gross"
]

for col in text_columns:
    if col in df.columns:
        df[col] = df[col].fillna("")

# Numeric columns
for col in ["RATING", "VOTES", "RunTime"]:
    if col in df.columns:
        df[col] = df[col].fillna(0)

# ----------------------------
# Remove Extra Spaces
# ----------------------------
for col in ["MOVIES", "GENRE", "ONE-LINE", "STARS"]:
    if col in df.columns:
        df[col] = (
            df[col]
            .astype(str)
            .str.replace(r"\s+", " ", regex=True)
            .str.strip()
        )

# ----------------------------
# Remove "Add a Plot"
# ----------------------------
df["ONE-LINE"] = df["ONE-LINE"].replace(
    "Add a Plot",
    "",
    regex=False
)

# ----------------------------
# Clean Genre
# ----------------------------
df["GENRE"] = (
    df["GENRE"]
    .str.lower()
    .str.replace(",", " ", regex=False)
    .str.replace(r"\s+", " ", regex=True)
    .str.strip()
)

# ----------------------------
# Clean Year
# ----------------------------

def extract_year(year):

    year = str(year)

    match = re.search(r"\d{4}", year)

    if match:
        return int(match.group())

    return 0


df["release_year"] = df["YEAR"].apply(extract_year)

# ----------------------------
# Extract Director
# ----------------------------

def get_director(text):

    text = str(text)

    match = re.search(r"Director[s]?:\s*(.*?)\|", text)

    if match:
        return match.group(1).replace("\n", " ").strip()

    return ""


df["DIRECTOR"] = df["STARS"].apply(get_director)

# ----------------------------
# Extract Actors
# ----------------------------

def get_actors(text):

    text = str(text)

    if "Stars:" in text:
        actors = text.split("Stars:")[-1]

    elif "Star:" in text:
        actors = text.split("Star:")[-1]

    else:
        return ""

    actors = actors.replace("\n", " ")
    actors = actors.replace(",", " ")

    actors = re.sub(r"\s+", " ", actors)

    return actors.strip()


df["ACTORS"] = df["STARS"].apply(get_actors)

# ----------------------------
# Clean Votes
# ----------------------------
df["VOTES"] = (
    df["VOTES"]
    .astype(str)
    .str.replace(",", "", regex=False)
)

df["VOTES"] = pd.to_numeric(df["VOTES"], errors="coerce").fillna(0).astype(int)

# ----------------------------
# Clean Runtime
# ----------------------------
df["RunTime"] = pd.to_numeric(
    df["RunTime"],
    errors="coerce"
).fillna(0).astype(int)

# ----------------------------
# Clean Rating
# ----------------------------
df["RATING"] = pd.to_numeric(
    df["RATING"],
    errors="coerce"
).fillna(0)

# ----------------------------
# Clean Gross
# ----------------------------

def gross_to_number(value):

    value = str(value).strip()

    if value == "":
        return 0

    value = value.replace("$", "")

    if value.endswith("M"):
        try:
            return float(value[:-1]) * 1_000_000
        except:
            return 0

    if value.endswith("K"):
        try:
            return float(value[:-1]) * 1_000
        except:
            return 0

    try:
        return float(value)

    except:
        return 0


df["Gross"] = df["Gross"].apply(gross_to_number)

# ----------------------------
# Remove Duplicate Movies
# Keep first occurrence only
# ----------------------------
df.drop_duplicates(
    subset=["MOVIES"],
    keep="first",
    inplace=True
)

# ----------------------------
# Remove Empty Movie Names
# ----------------------------
df = df[df["MOVIES"] != ""]

# ----------------------------
# Create Combined Feature
# ----------------------------
df["combined_features"] = (

    df["MOVIES"] + " " +

    df["GENRE"] + " " +

    df["ONE-LINE"] + " " +

    df["DIRECTOR"] + " " +

    df["ACTORS"]

)

df["combined_features"] = (

    df["combined_features"]

    .str.lower()

    .str.replace(r"\s+", " ", regex=True)

    .str.strip()

)

# ----------------------------
# Reset Index
# ----------------------------
df.reset_index(drop=True, inplace=True)

# ----------------------------
# Save Clean Dataset
# ----------------------------
df.to_csv(
    "dataset/clean_movies.csv",
    index=False
)

# ----------------------------
# Display Information
# ----------------------------

print("\nDataset cleaned successfully.")

print("\nFinal Shape:")
print(df.shape)

print("\nMissing Values:")
print(df.isnull().sum())

print("\nFirst 5 Rows:")
print(df.head())

print("\nColumns:")
print(df.columns.tolist())