#!/bin/bash

# ==== CONFIG ====
PATH_APP=$(pwd)
FILE_BUILD_NUMBER=BUILDNUMBER.txt
FILE_CHANGE_LOG=CHANGELOG.txt

# ==== GENERATE NEW VERSION ====
VERSION=$(git -C $PATH_APP/app/ tag --contains $(git -C $PATH_APP/app/ rev-parse HEAD))
if [ -z $VERSION ]
then
        LAST_TAG=$(git -C $PATH_APP/app/ describe --tags $(git -C $PATH_APP/app/ rev-list --tags --max-count=1))

        MAJOR=$(cut -d'.' -f1 <<<"$LAST_TAG")
        MINOR=$(cut -d'.' -f2 <<<"$LAST_TAG")
        PATCH=$(cut -d'.' -f3 <<<"$LAST_TAG")

        NEW_PATCH=$(expr $PATCH + 1)
        VERSION="$MAJOR.$MINOR.$NEW_PATCH"
fi

TOTAL_TAGS=$(cat $PATH_APP/$FILE_BUILD_NUMBER)
VERSION_CODE=$(expr $TOTAL_TAGS + 1)
VERSION_NAME=$(echo $VERSION |tr -d "v")

echo $VERSION_CODE > $PATH_APP/$FILE_BUILD_NUMBER

echo "prebuild android VERSION CODE: $VERSION_CODE"
echo "prebuild android VERSION NAME: $VERSION_NAME"

# ==== UPDATE REPO NATIVE AND REACT =====
git -C $PATH_APP checkout master 

cd $PATH_APP; rm -rf node_modules package-lock.json && npm i
git -C $PATH_APP/app/ pull origin master
git -C $PATH_APP/react-shared/ checkout master && git -C $PATH_APP/react-shared pull --rebase origin master

export PATH="/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"

# ==== UPDATE CODEPUSH ====
cd $PATH_APP; npm run bundle-android
cd $PATH_APP; appcenter codepush release-react -a belezanaweb/mobile-android -d Production -t $VERSION_NAME -m

# ==== UPDATE CHANGELOG ====
cp $PATH_APP/$FILE_CHANGE_LOG $PATH_APP/app/fastlane/metadata/android/pt-BR/changelogs/$VERSION_CODE.txt

# ==== BUILD AND UPLOAD APK ====
if cd $PATH_APP/app; fastlane android beta; then
   
	git -C $PATH_APP tag $VERSION
	git -C $PATH_APP push --delete origin $VERSION
	git -C $PATH_APP push origin $VERSION
	git -C $PATH_APP add $FILE_BUILD_NUMBER
	git -C $PATH_APP commit -m "add: build version $VERSION_CODE $VERSION"
	git -C $PATH_APP push origin master

    echo "success !!!!! :)"
else
	1>&2 echo "error !!!!! :("
	exit 1
fi

